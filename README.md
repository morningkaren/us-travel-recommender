# us-travel-recommender

#### If you are planning to travel to the United States, you can use the US Travel Recommender to see which states are recommended to go to during certain months, the cost of living in those states, photos of those states, and answers to questions you may have about specific states. Here is the home page of the website: 

<img width="1438" alt="Screen Shot 2020-10-26 at 6 09 32 PM" src="https://user-images.githubusercontent.com/49875057/97241211-c9b55600-17c6-11eb-8cae-1cad321109ce.png">

#### In the Overview tab, one can select one or more months when they will be traveling to the U.S. and receive recommended states to visit along with their cost of living ranking. If they click on the Map button, they can see a small map of where the state is located relative to the rest of the United States.

<img width="1440" alt="Screen Shot 2020-10-26 at 6 09 58 PM" src="https://user-images.githubusercontent.com/49875057/97241338-2add2980-17c7-11eb-9e0b-52871d9099d2.png">

<img width="1436" alt="Screen Shot 2020-10-26 at 6 10 12 PM" src="https://user-images.githubusercontent.com/49875057/97241419-6ed02e80-17c7-11eb-8907-068bf88479be.png">

#### In the Search tab, one can select one or multiple states and enter a question or a keyword and get some results regarding their query about the particular state(s) he or she selected. They can also click on the Image button to see an image of the particular location in that state. At the heart of the Search functionality is a closed-domain-question-and-answering model (cdqa). The data was taken from Wikivoyage. 

<img width="1435" alt="Screen Shot 2020-10-26 at 6 11 12 PM" src="https://user-images.githubusercontent.com/49875057/97241578-e8681c80-17c7-11eb-9361-2f16563b3577.png">

#### In the Photo Gallery tab, one can search for photos of any place in the United States they can think of. Of course, not all photos of all places will exist in the gallery, but one can certainly search for photos of states and they will find some photos there. 

<img width="1437" alt="Screen Shot 2020-10-26 at 6 11 45 PM" src="https://user-images.githubusercontent.com/49875057/97241635-14839d80-17c8-11eb-9f92-8145b93b977b.png">

## How to run the website on your local machine

1. You would need to clone this repository or download the files. 

2. The bert_qa.joblib file that the cdqa model uses also needs to be downloaded online. You would need to put the downloaded model in the model folder in the Flask/server/src/models directory. You can download the bert_qa.joblib file here - https://github.com/cdqa-suite/cdQA/releases/tag/bert_qa

3. You would need to have Python 3.7 and Angular downloaded. If you do not have Angular downloaded, you can download Angular by 
    a) Downloading node.js : https://nodejs.org/en/
    b) Downloading the Angular CLI with : npm install -g @angular/cli
    c) Running ng version to see that Angular has been installed. 

4. In a terminal, you can set up a virtual environment to run the Flask backend. You would need to install all the dependencies in the reqs.txt file in Flask/server path. You can use pip to do so. ( pip install -r reqs.txt ) 

5. Since the dependencies for the front-end (node_modules) are not included in this repository, you need to create your own Angular application first and then replace the src files with the src files in this respository. 

5. Run your Flask backend in a terminal by going into the Flask/server/src directory and running the command : python app.py 

6. In another terminal, you can start the Angular frontend by going into the travel app directory and running the command : ng serve

7. You can view the application at localhost:4200 (default). 


    



