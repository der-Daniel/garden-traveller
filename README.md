# garden traveller
 #hackDA15
 
Campus Hackathon Darmstadt project
http://slides.com/derdaniel/deck#/

## Install

```
virtualenv -p /usr/bin/python3 venv
. venv/bin/activate
pip install -r requirements.txt
python3 runserver.py
cd app/static
bower install
npm install
gulp (manually kill gulp when watch task is started)
gulp (need to to this a 2nd time; manually kill gulp when watch task is started)
http-server dist
```

Open http://localhost:8080 and enjoy!

