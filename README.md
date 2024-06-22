# Technical test for SEVEN

## Project Setup

### Clone the Repository

First, clone the repository to your local machine and navigate into the project directory:

```bash
git clone https://github.com/Yayabtw/seven-test.git
cd seven-test
```

Install Dependencies
Install the necessary dependencies using :
    
```bash
npm install
```
Then run the development server using:

```bash
npm run serve
```
This will run the application locally and provide live reloading for any changes you make.

## Thought Process and Choices
### Frontend Framework
I chose Vue.js for this project due to its simplicity and ease of integration with other libraries. Vue's component-based architecture allows for a modular approach, making the codebase more maintainable.

### State Management
For state management, I utilized Pinia. It's simple to use and pretty popular and lightweight.

### UI Components
Vuetify was used for the UI components to ensure a consistent and responsive design. Vuetify has a style like Material Design to provide a clean and modern look and speed up the development process. 

### HTTP Requests
I used Axios because it's simple to use, it's well maintained and it's the reference when it comes to doing HTTP requests. It handles API interactions for fetching and managing conversations and messages efficiently.

### Responsive Design
The chat bubble design is inspired by the Apple Message app and is fully responsive to provide a good user experience on mobile devices.

## Project Structure
### Components
* ConversationsList.vue: Displays the list of conversations. Allows the user to create a new conversation.
* ConversationDetail.vue: Displays the messages in a selected conversation. Allows the user to send new messages.
* CreateConversation.vue: Provides a form to select a user and send the initial message to create a new conversation.

### State Management
* stores/conversations.js: Manages the state for conversations and messages, including fetching, adding, and updating them. It also manages the fetching of the users
