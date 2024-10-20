## ReadMe: Coin Distribution Webpage

### Overview

This React-based webpage is designed to assist users in calculating how much each player owes based on the number of coins they earned and the amount spent in a game. The interface allows you to input details such as the game value, initial coins received, and final coins for each player, then calculates the financial balance for all selected players.

### Features

1.  **Player Selection**:

    - Users can select the players participating in the transaction by checking the boxes next to their names. Players are displayed with initials and their respective balances or debt.
    - The application shows a message beneath each player, indicating how much they owe or are owed based on the game outcome.

2.  **Transaction Calculator**:

    - **Game Value**: Input field to specify the total value of the game in dollars.
    - **Initial Coins Received**: Field to input the initial number of coins each player received at the beginning of the game.
    - **Final Coins**: For each player, enter the final number of coins they hold at the end of the game. This determines the amount each player owes or should be paid back based on their performance.

3.  **Dynamic Balance Calculation**:

    - Upon entering the values, the "Balance" button computes the results and displays them in the player section, showing who owes whom and how much.
    - The system calculates the final balances by comparing the coins each player had at the beginning and end of the game, in conjunction with the game’s total value.

4.  **Reset Button**:

    - Allows users to clear all input fields and selections, resetting the form to its default state.

5.  **Add Friend Button**:

    - Users can add new players to the game by clicking the “Add Friend” button.

### Usage Instructions

1.  **Select Players**:

    - Check the boxes next to the names of the players who participated in the game.

2.  **Input Game Value**:

    - Enter the total game value in the **Game Value** input field.

3.  **Enter Coin Details**:

    - Fill out the **Initial Coins Received** field with the starting number of coins given to all players.
    - Enter the final number of coins each player has in the fields provided for each player under "Ve final coins," "Hrithik final coins," "Su final coins," and "Vis final coins."

4.  **Calculate**:

    - Click the **Balance** button to calculate and display the owed amounts.
    - The results will show under the player list, indicating who owes whom and how much.

5.  **Reset**:

    - To clear all fields and selections, click the **Reset** button.

### Technologies Used

- **React.js**: The webpage is built using React.js for interactive UI components and state management.
- **HTML/CSS**: For basic structure and styling of the user interface.

### Setup and Installation

1. git clone
2. cd
3. npm install
4. npm start
5. http://localhost:3000

The website is live at https://hrithikgit.github.io/poker-balance/

Here is the screenshot
![Alt text](<Screenshot 2024-10-20 at 2.09.31 PM.png>)
