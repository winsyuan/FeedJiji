# Feed Jiji

### Mobile Application for Feeding Jiji
- created this app so we can keep track of when jiji was feed throughout the day to help and maintain a healthy diet for him

### How It Works
- create/join a group for a pet
- check group page to see if pet fed
- if not, go feed him and update the group with app


### Technology Used
- React Native
- Firebase
- Django
- MongoDB
- Docker


### UI Designs [(Figma)](https://www.figma.com/file/AYQFYuTM6fWEhoshHtK3pt/feed-jiji) 😨
- splash screen image (consist of image of jiji)
- groups screen (list view of all groups user is apart of)
- create/join group screen (create a group for pet or join a group with group code)
- group info screen (shows detail of when pet was last fed by which user in a group)


### Run Locally
1. Clone the repository
2. Install dependencies and run applications
    ``` sh
        # Setup frontend
        cd frontend
        # install dependencies
        npm install
        npm start

        # Setup backend
        cd ../backend
        # create virtual environment
        python -m venv venv
        # on windows
        venv\Scripts\activate
        # on macOS
        source venv/bin/activate
        # install pip modules
        pip install -r requirements.txt
        python manage.py runserver 0.0.0.0:8000
    ```