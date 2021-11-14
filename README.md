# Slidedeck - Immunohistochemical Validation Forms

Currently immunohistochemical validations are done by hand in a weekly basis which generates an extensive amount of paperwork and sometimes errors due to terrible doctors handwriting. Our main goal in this project is to say no more Indecipherable doctor handwriting, and create a digital system to improve the workflow on the pathologist lab at UNC Health.

## Getting Started

### 1. General Prerequisites
To setup the development environment install the following global dependencies.

    - [Python 3.6 or greather](https://www.python.org/)
    - [PIP3](https://pip.pypa.io/en/stable/)
    - [NodeJs 16 or greather](https://nodejs.org/en/)

### 2. FrontEnd Prerequisites
Before getting started with frontend development make sure the following requirements are installed using the NodeJs package manager **npm**:

    - tailwindcss
    - craco
    - axios
    - react-helmet-async
    - react-icons
    - react-router-dom

### 3. BackEnd Prerequisites
Before getting started with backend development make sure the following requirements are installed using the Python package manager **pip**:

    - aniso8601==9.0.1
    - asgiref==3.4.1
    - click==8.0.1
    - coverage==6.0.2
    - Flask==2.0.1
    - Flask-Cors==3.0.10
    - Flask-RESTful==0.3.9
    - gunicorn==20.1.0
    - importlib-metadata==4.8.1
    - itsdangerous==2.0.1
    - Jinja2==3.0.1
    - MarkupSafe==2.0.1
    - pymongo==3.12.0
    - pytz==2021.1
    - six==1.16.0
    - sqlparse==0.4.2
    - typing-extensions==3.10.0.2
    - Werkzeug==2.0.1
    - zipp==3.5.0
    - dnspython==1.16.0

### 4. Testing Prerequisites
For frontend testing use **CypressJS** which has the following dependecies:

    - cypress: https://www.cypress.io/
    - mocha (For testing report generation): https://mochajs.org/

Use NodeJs package manager **npm** to install those dependencies.

### 5. Installing
Step by step installation process:

    1. Clone backed repo: 
    `git clone https://github.com/cdrubido9307/comp523-app.git`

    2. Install Backend dependencies (Make sure your current directory is the backend cloned directory. It should contain a file named requirements.txt):
    `pip install -r requirements.txt`

    3. Clone frontend repo:
    `git clone https://github.com/cdrubido9307/slidedeck-fe.git`

    4. Install Frontend dependencies (Make sure your current directory is the frontend cloned directory. It should contain a file named pakage.json):
    `npm install`


### 6. Running Locally
To start a local instance of the flask server once all the backend dependencies are installed you can navigate to the folder where the backend flask app is located (it should contain a file named api.py) and you should be able to start api.py as a regular python program:

    `python3 api.py`

### 7. Warranty


## Testing

## Deployment

## API Reference

## Database Schema

## Technologies

## Contributing

## Authors

## License

## Acknowledgements

