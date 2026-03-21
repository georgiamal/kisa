-- Enable the uuid-ossp extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (linked to Supabase auth.users)
-- Note: auth.users is automatically managed by Supabase Auth
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    phone TEXT,
    address TEXT,
    area TEXT,
    postcode TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Cats table
CREATE TABLE cats (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    owner_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    age_years INTEGER,
    gender TEXT,
    attributes TEXT[],
    home_lat DECIMAL(9,6),
    home_lng DECIMAL(9,6),
    is_outdoor BOOLEAN DEFAULT FALSE,
    is_microchipped BOOLEAN DEFAULT FALSE,
    microchip_id TEXT,
    is_lost BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Listings table
CREATE TABLE listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cat_id UUID NOT NULL REFERENCES cats(id) ON DELETE CASCADE,
    created_by_user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    lost_since TIMESTAMPTZ,
    address TEXT,
    area TEXT,
    postcode TEXT,
    description TEXT,
    last_seen_lat DECIMAL(9,6),
    last_seen_lng DECIMAL(9,6),
    last_seen_at TIMESTAMPTZ,
    resolved_at TIMESTAMPTZ
);

-- Listing photos table
CREATE TABLE listing_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    storage_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Followed listings table (junction table for users following listings)
CREATE TABLE followed_listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    UNIQUE(user_id, listing_id) -- Prevent duplicate follows
);

-- Sightings table
CREATE TABLE sightings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
    submitted_by_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    lat DECIMAL(9,6),
    lng DECIMAL(9,6),
    comment TEXT,
    status TEXT NOT NULL DEFAULT 'unverified' 
        CHECK (status IN ('unverified', 'verified', 'dismissed')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sighting photos table
CREATE TABLE sighting_photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sighting_id UUID NOT NULL REFERENCES sightings(id) ON DELETE CASCADE,
    storage_url TEXT NOT NULL,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notification preferences table (one-to-one with profiles)
CREATE TABLE notification_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    new_nearby_listing BOOLEAN DEFAULT TRUE,
    nearby_radius_km INTEGER DEFAULT 5,
    sighting_on_followed BOOLEAN DEFAULT TRUE,
    watched_postcodes TEXT[],
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto create user profile on sign up
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO profiles (id) VALUES (NEW.id);

    INSERT INTO notification_preferences (user_id) VALUES (NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER after_user_signup
    AFTER INSERT ON auth.users
        FOR EACH ROW
        EXECUTE FUNCTION create_user_profile();

-- Copy coordinates to listings when a sighting is verified
CREATE OR REPLACE FUNCTION update_listing_from_verified_sighting()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'verified' AND OLD.status <> 'verified' THEN
        UPDATE listings
        SET last_seen_lat = NEW.lat,
            last_seen_lng = NEW.lng,
            last_seen_at = NEW.created_at
        WHERE id = NEW.listing_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER after_sighting_update
    AFTER UPDATE ON sightings
        FOR EACH ROW
        EXECUTE FUNCTION update_listing_from_verified_sighting();

-- Enable Row-Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cats ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE followed_listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sightings ENABLE ROW LEVEL SECURITY;
ALTER TABLE sighting_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_preferences ENABLE ROW LEVEL SECURITY;

-- users can only view / edit their own profile
CREATE POLICY "Users can view their own profile" ON profiles
    FOR ALL
    USING (id = auth.uid());
CREATE POLICY "Users can edit their own profile" ON profiles
    FOR UPDATE
    USING (id = auth.uid());

-- cats:  owners can do anything with their own cats, everyone can view cats
CREATE POLICY "Everyone can view cats" ON cats
    FOR SELECT
    USING (true);

CREATE POLICY "Owners can insert cats" ON cats
    FOR INSERT
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Owners can update their cats" ON cats
    FOR UPDATE
    USING (owner_id = auth.uid());

CREATE POLICY "Owners can delete their cats" ON cats
    FOR DELETE
    USING (owner_id = auth.uid());

-- listings:  owners can do anything with their own listings, everyone can view listings
CREATE POLICY "Everyone can view listings" ON listings
    FOR SELECT
    USING (true);

CREATE POLICY "Owners can insert listings" ON listings
    FOR INSERT
    WITH CHECK (created_by_user_id = auth.uid());

CREATE POLICY "Owners can update their listings" ON listings
    FOR UPDATE
    USING (created_by_user_id = auth.uid());

CREATE POLICY "Owners can delete their listings" ON listings
    FOR DELETE
    USING (created_by_user_id = auth.uid());

-- listing_photos:  only listing owner can manage photos, Everyone can view photos
CREATE POLICY "Everyone can view listing photos" ON listing_photos
    FOR SELECT
    USING (true);

CREATE POLICY "Listing owners can insert photos" ON listing_photos
    FOR INSERT
    WITH CHECK (listing_id IN (SELECT id FROM listings WHERE created_by_user_id = auth.uid()));

CREATE POLICY "Listing owners can update photos" ON listing_photos
    FOR UPDATE
    USING (listing_id IN (SELECT id FROM listings WHERE created_by_user_id = auth.uid()));

CREATE POLICY "Listing owners can delete photos" ON listing_photos
    FOR DELETE
    USING (listing_id IN (SELECT id FROM listings WHERE created_by_user_id = auth.uid()));

-- followed_listings: users can follow/unfollow listings
create policy "Users can view own followed listings" on followed_listings
    for select
    using (user_id = auth.uid());

CREATE POLICY "Users can follow listings" ON followed_listings
    FOR INSERT
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can unfollow listings" ON followed_listings
    FOR DELETE
    USING (user_id = auth.uid());

-- sightings: authenticated users can create sightings, everyone can view sightings
CREATE POLICY "Everyone can view sightings" ON sightings
    FOR SELECT
    USING (true);

CREATE POLICY "Anyone can create sightings" ON sightings
    FOR INSERT
    WITH CHECK (true);

CREATE POLICY "Listing owners can update sighting status" ON sightings
    FOR UPDATE
    USING (listing_id IN (SELECT id FROM listings WHERE created_by_user_id = auth.uid()));

-- sighting_photos:  only sighting submitter can manage photos, Everyone can view photos
CREATE POLICY "Everyone can view sighting photos" ON sighting_photos
    FOR SELECT
    USING (true);

CREATE POLICY "Sighting submitters can insert photos" ON sighting_photos
    FOR INSERT
    WITH CHECK (sighting_id IN (SELECT id FROM sightings WHERE submitted_by_user_id = auth.uid()));

-- notification_preferences: users can manage their own notification preferences
CREATE POLICY "Users can view their notification preferences" ON notification_preferences
    FOR SELECT
    USING (user_id = auth.uid());

CREATE POLICY "Users can update their notification preferences" ON notification_preferences
    FOR UPDATE
    USING (user_id = auth.uid());
