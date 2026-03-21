ActivityIndicator for loading icon
Make sure kb doesn't cover the text field being filled in
Using expo for images vs rn loads them faster

**The map pin system**

For the map you'd have three types of pins pulling from different data:
```
red pin      — where the cat was last seen when reported (from listings.last_seen_lat/lng)
yellow pin   — pending sightings (status = 'pending')
green pin    — confirmed sightings (status = 'confirmed')
grey pin     — rejected sightings (status = 'rejected') — shown faded or toggleable

