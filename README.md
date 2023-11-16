# react-website
Website discussion forum using react

Create website using node.js approach by using express js and cors to build up server. Then using sequelize to interact with mysql database at phpmyadmin and other necessary libraries to build backend server. Manage controller and routing at backend server to receive request and send json data as a response, also setup auth for login, logout, and register. After finish built backend server, i test the request using REST Client to check if the request controller works fine. 

At frontend side, this website using ReactJS and TailwindCSS to create component and design. In React, im using axios to fetch api from backend and using redux toolkit to configure login authentication using createAsyncThunk that later will process whether the login is error, successful, or still loading. A lot of React hooks were used in this project, such as useState, useEffect, useContext, useNavigate, etc. Also this website will immediately shows up the updated content using useEffect to detect any update occuring. For example when creating new post, the pages wont reload but the new post will shows up instantly, or when updating content of that post will also do.
