import pyowm

def getWeather(city):
    owm = pyowm.OWM('b484eca681a51cc9bdbde2ad3f115c77') 

    # Search for current weather
    try:
        observation = owm.weather_at_place(city)
    except:
        weather =	{
            "temparature": "",
            "lattitude": "",
            "longtitude": ""
        }
        return weather
    w = observation.get_weather()
    temps=w.get_temperature('celsius')
    temp = temps['temp']

    l = observation.get_location()
    lat = l.get_lat()
    long = l.get_lon()

    weather =	{
        "temparature": temp,
        "lattitude": lat,
        "longtitude": long
    }
    return weather