import requests

# RANDOM_THRESHOLD = 40


def calculateLocationOrder(userRequest, offerings, startLoc, endLoc):
    print('CALC LOCATION ORDERING', userRequest)

    unorderedOfferings = []
    for productId in userRequest:
        print('FIND CLOSEST OFFERING FOR PRODUCT ID ', productId)
        amount = userRequest[productId]
        offeringId = getClosestOffering(productId, amount, offerings)
        if offeringId is None:
            print('ERROR: Can not find offering for product id %s' % productId)
            return None

        skip = False
        for o in unorderedOfferings:
            if o['garden_id'] == offerings[offeringId]['garden_id']:
                skip = True
                break
        if not skip:
            unorderedOfferings.append(offerings[offeringId])

    # orderedOfferings = getOrderedOfferings(startLoc, endLoc, unorderedOfferings)
    orderedOfferings = getOrderedOfferingsOSM(startLoc, endLoc, unorderedOfferings)
    return orderedOfferings


def getOrderedOfferingsOSM(startLoc, endLoc, unorderedOfferings):
    # Docu: https://github.com/Project-OSRM/osrm-backend/wiki/Server-api
    places = []
    places.append(startLoc)
    places.extend(unorderedOfferings)
    places.append(endLoc)
    viaLocations = '&'.join(map(lambda p: 'loc=' + p['longitude'] + ',' + p['latitude'], places))

    url = 'http://router.project-osrm.org/viaroute?%s' % viaLocations
    print('URL', url)
    r = requests.get(url)
    print(r.json()['via_points'])
    return r.json()['via_points']


def getClosestOffering(productId, amount, offerings):
    # FIXME: this just blindly selects the first match
    for id in offerings:
        if offerings[id]['product_id'] == int(productId) and offerings[id]['amount'] >= amount:
            return id
    return None


# def getOrderedOfferings(startLoc, endLoc, unorderedOfferings):
#     numNodes = len(unorderedOfferings)
#     finalDistance = 1000000000
#     finalPlaces = []
#     for i in range(RANDOM_THRESHOLD):
#         places = []
#         places.append(startLoc)
#
#         nodeIds = [i for i in range(numNodes)]
#         random.shuffle(nodeIds)
#         for id in nodeIds:
#             places.append(unorderedOfferings[id])
#         places.append(endLoc)
#
#         totalDistance = getTotalDistance(places)
#         if totalDistance < finalDistance:
#             finalDistance = totalDistance
#             finalPlaces = places
#
#     return finalDistance
#
#
# def getTotalDistance(places):
#     print('MYMAP')
#     print(list(map(lambda p: p['latitude'] + ',' + p['longitude'], places)))
#     origins = '|'.join(map(lambda p: p['latitude'] + ',' + p['longitude'], places))
#     destinations = origins
#     url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&mode=bicycling&language=de-DE&key=AIzaSyD4-8bDHyvmoN45VH6tgtSCthohgqvS-IU' % (origins, destinations)
#     print('URL', url)
#     r = requests.get(url)
#     print('RESPONSE', r)
#     print(r.json())
#     return {}
