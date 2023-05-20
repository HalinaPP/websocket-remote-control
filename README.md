# websocket-remote-control
 This app is a remote control backend, that use nutjs.dev library and websocket.
 
 The backend is able to do the following:

   - Start websocket server
   - Handle websocket connection
   - Move mouse (Up, Down, Left, Right)
   - Draw circle, rectangle and square
   - Send current mouse coordinates
   - Send desktop capture

## INSTALL instruction
 

1.  To install the application on your local machine, you need to clone the repository using the following command

        git clone https://github.com/HalinaPP/websocket-remote-control.git

2.  Switch to the 'dev' branch

        git checkout dev

3. install all dependencies (make sure you have internet connection and have LTS version of nodejs [npm](https://nodejs.org/en/)) 

       npm install

4.  create `.env` file. 
   - rename  `.env.example` to `.env`
   - store ports value in the `.env` file, on which application is running, for example:
  
         WS_PORT=8080
         HTTP_PORT=4000

## Using application
  1. Run
  
          npm run start
      
 
 2. Open http-client in the browser 
     
        http://localhost:HTTP_PORT  
  
  (use HTTP_PORT value from .env file, for example: http://localhost:4000)
  
 
 3. Read the instructions on the client page
     
      
  **!!! P.S.** If rectangular of 200 px square around the mouse position is go out the browser borders during print screen process, you will receive error message on the server side and client won't show image in the preview window.
  


