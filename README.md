# CEO-Express

Current Operational Use Cases:
1. Brainstorming - The user can input their own ideas of startups and all of this information will be displayed on the screen and saved in the history for later uses.
2. Clicking Check Boxes - The user can choose which ideas they want to generate more ideas on and will be able to see the display of the new ideas that were generated.
3. Add Button - Clicking on the add button will generate new ideas based on the current existing ones

**Instructions**

Connecting Flask to ReactJs
Run these commands in your terminal 
1. Run command apt install python3.10-venv
2. sudo apt install python3-pip
3. sudo apt install npm
4. pip install flask_cors
5. For mac/unix users: python3 -m venv env and For windows users: py -m venv env
6. For mac/unix users: source env/bin/activate and For windows users: .\env\Scripts\activate
7. pip install flask
8. pip install python-dotenv
9. touch .flaskenv
10. FLASK_APP=base.py
FLASK_ENV=development



Testing the Backend using our tests
1.  Open terminal
2.  cd BackEnd
3.  pip install pyodbc
4.  sudo apt install unixodbc
5.  pip install fastapi
6.  check if pytest is installed ('pytest --version')
7.  If pytest is not installed, run ('pip install -U pytest')
8.  run ('pytest')

Testing the website:
1. cd front-end
2. npm install
3. npm run start

We aim to revolutionize entrepreneurship by introducing a cutting-edge ideation helper powered by AI technology that suggests new ideas based on pre-existing user-inputted brainstorming lists.
This tool will utilize a three-tier architecture, including web development tools such as React/TypeScript and Flask for a user-friendly interface - as well as tools such as Scrapy, GPT-3 API, and AutoGPT to do efficient market analysis - to identify current gaps in the market and potential customer interest, enhanced by storage and searching capabilities. With this tool, users will be able to learn the best potential businesses they can start; this tool will also provide a step-by-step guide and modern user interface for novice entrepreneurs, empowering the future of business for all.

We will implement the following features:
1. Our product will have a feature where users are able to have a brainstorming session with our ideation helper. The user will be able to input a variety of ideas and keywords and our product will assist users in creating different business ideas that revolve around the users’ ideas.
   
2. Our product will have the ability to automatically identify gaps in the market, powered by AutoGPT. With this tool, users can see what areas in the market are most profitable and least competitive for creating new businesses, allowing them to have a greater chance of success.
   
3. After the user has an idea for a business, our product will provide a step-by-step business manual for building the idea. This tool is especially useful for entrepreneurs, as we will provide users with helpful links, resources, and other tips/tricks on getting started with building the business idea. This step-by-step business manual will also be specific to each individual business idea so that users have an even greater chance of finding success.

4. Our product will have a fully operational UI so that users will be able to navigate our site with ease.

Our stretch goals are implementing the following features:

1. Our product will ideally be able to conduct general market analysis, which entails gathering information about market caps and the economics and accounting side of general areas in the market.
   
2. Our product will ideally allow for users to be able to revisit their previous queries each time they log onto the site by searching for them or being able to access them on the side of the screen.
   
3. Our product will have the ability to crawl social media sights to see popular trends e.g. what topics individuals are interested in/talking about across the World Wide Web. By being able to determine general online interest in certain markets on social media, e.g. through Google Trends and trending Twitter Hashtags, our users will be able to see where their potential customers are to market their products to them more successfully.

https://docs.google.com/document/d/1nZeP6LAGY-ueeI4x1E1g5W2aqDKLQkEQwbS65pBVTo8/edit?usp=sharing 

This repo contains three folders: one folder that contains FrontEnd development, one folder that contains BackEnd development, and one folder that contains workers.
