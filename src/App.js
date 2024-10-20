import { useState, useEffect, Fragment } from "react";

let list =
  localStorage.getItem("friendsList") === null
    ? JSON.stringify([
        { id: 12345, name: "Hrithik", balance: 0, played: true, desc: "" },
      ])
    : localStorage.getItem("friendsList");

const initialFriends = JSON.parse(list);

export default function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleBalances(e, friendsCopy, coins, cost) {
    e.preventDefault();
    friendsCopy = friendsCopy.filter((friend) => friend.played);
    let sum = friendsCopy.reduce(
      (sum, friend) => sum + parseInt(friend.balance),
      0
    );
    let totalPlayers = friendsCopy.length;
    const epsilon = 0.01;

    if (friendsCopy.length <= 1) {
      alert("There should be minimum two players");
      return;
    }

    if (coins === 0 || cost === 0) {
      alert("Please specify coins and cost of game");
    }

    if (!(sum === totalPlayers * coins)) {
      if (
        !window.confirm(
          `The tally doesn't match! Extra coins ${
            totalPlayers * coins - sum
          }, You sure about this ?`
        )
      ) {
        return;
      }
    }

    let ratio = coins / cost;
    // console.log(ratio);
    console.log(friendsCopy);
    friendsCopy = friendsCopy.map((friend) => ({
      ...friend, // Keep the rest of the friend's properties intact
      desc: "",
      finalAmount: parseInt(friend.balance) / ratio - cost, // Update the balance
    }));

    friendsCopy = friendsCopy.sort((a, b) => b.finalAmount - a.finalAmount);

    let start = 0,
      end = friendsCopy.length - 1;

    while (start < end) {
      let firstBalance = friendsCopy[start].finalAmount.toFixed(2);
      if (firstBalance < 0) break; //Breaking if everyone in profits are balanced
      let lastBalance = Math.abs(friendsCopy[end].finalAmount.toFixed(2));

      if (firstBalance === 0) break;

      if (firstBalance >= lastBalance) {
        firstBalance -= lastBalance;
        friendsCopy[end].desc = getText(
          friendsCopy[end].desc,
          friendsCopy[start].name,
          lastBalance
        );
        friendsCopy[start].desc = getText(
          friendsCopy[start].desc,
          friendsCopy[end].name,
          lastBalance,
          false
        );
        friendsCopy[start].finalAmount = firstBalance;
        friendsCopy[end].finalAmount = 0;
        end--;
      } else {
        lastBalance -= firstBalance;

        friendsCopy[end].desc = getText(
          friendsCopy[end].desc,
          friendsCopy[start].name,
          firstBalance
        );

        friendsCopy[start].desc = getText(
          friendsCopy[start].desc,
          friendsCopy[end].name,
          firstBalance,
          false
        );

        friendsCopy[end].finalAmount = -lastBalance;
        friendsCopy[start].finalAmount = 0;
        start++;
      }
    }

    // friendsCopy = friendsCopy.map((friend) => ({ ...friend, balance: 0 }));
    setFriends(friendsCopy);
    localStorage.setItem("friendsList", JSON.stringify(friendsCopy));
  }

  function getText(curr, name, amount, owe = true) {
    if (amount === 0) return curr;
    if (owe)
      return curr.length == 0
        ? `You owe ${name} ${Math.abs(amount)}$`
        : curr + `, ${name} ${Math.abs(amount)}$`;
    else
      return curr.length == 0
        ? `You will recieve ${Math.abs(amount)}$ from ${name}`
        : curr + `, ${Math.abs(amount)}$ from ${name}`;
  }

  function handleAddFriend(e, name, image, setName, setImage) {
    e.preventDefault();
    if (!name.trim()) return;
    // console.log(name);
    setFriends((friends) => [
      ...friends,
      { id: Date.now(), name, image, played: true, balance: 0, finalAmount: 0 },
    ]);
    setName("");
    setImage("");
  }

  function handlePlayedStatus(id) {
    // console.log(id);
    setFriends((friends) =>
      friends.map(
        (friend) =>
          friend.id === id
            ? { ...friend, played: !friend.played } // Create a new object with updated played status
            : friend // Return the original friend if the id doesn't match
      )
    );
  }

  function handleReset() {
    localStorage.setItem(
      "friendsList",
      JSON.stringify([
        { id: 12345, name: "Hrithik", balance: 0, played: true, desc: "" },
      ])
    );
    window.reload();
  }

  return (
    <>
      <div className="app">
        <div className="sidebar">
          <FriendsList
            friends={friends}
            handlePlayedStatus={handlePlayedStatus}
          />
          {showAddFriend && <FormAddFriend handleAddFriend={handleAddFriend} />}
          <Button
            onClick={() => setShowAddFriend((showAddFriend) => !showAddFriend)}
          >
            {!showAddFriend ? "Add Friend" : "Close"}
          </Button>
        </div>
        <PokerForm
          friends={friends}
          handleBalances={handleBalances}
          handleReset={handleReset}
        />
      </div>
    </>
  );
}

function FriendsList({ friends, handlePlayedStatus }) {
  return (
    <>
      <h2 className="text-center"> SELECT PLAYERS </h2>
      <ul>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friend={friend}
            handlePlayedStatus={handlePlayedStatus}
          />
        ))}
      </ul>
    </>
  );
}

function Friend({ friend, handlePlayedStatus }) {
  return (
    <li>
      {/* <img src={friend.image} alt={friend.name}></img> */}
      <div className="namelogo">
        <p className="margintop">{friend.name[0]}</p>
      </div>
      <h3>{friend.name}</h3>
      {friend.desc && <p className="red"> {friend.desc} </p>}
      <input
        type="checkbox"
        checked={friend.played}
        onChange={() => handlePlayedStatus(friend.id)}
      />
    </li>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ handleAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  return (
    <form className="form-add-friend">
      <label>👫 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      {/* <label>🌄 Image URL</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      /> */}
      <Button
        onClick={(e) => handleAddFriend(e, name, image, setName, setImage)}
      >
        Add
      </Button>
    </form>
  );
}

function PokerForm({ friends, handleBalances, handleReset }) {
  const [cost, setCost] = useState(0);
  const [coins, setCoins] = useState(0);

  const [friendsCopy, setFriendsCopy] = useState(friends);

  useEffect(() => {
    setFriendsCopy(friends);
  }, [friends]);

  function updateFriendAmount(e, balance, id) {
    e.preventDefault();
    setFriendsCopy((friendsCopy) =>
      friendsCopy.map((friend) =>
        friend.id === id
          ? {
              ...friend,
              balance: e.target.value,
            }
          : friend
      )
    );

    // console.log(friendsCopy);
  }

  return (
    <form className="form-split-bill">
      <h2>Calculate Transactions</h2>
      <label>💰 Game Value ( in Dollars ) </label>
      <input
        type="text"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
      />
      <label>🧍‍♂️ Intial Coins Recieved</label>
      <input
        type="text"
        value={coins}
        onChange={(e) => setCoins(e.target.value)}
      />
      {friendsCopy.map(
        (friend) =>
          friend.played && (
            <Fragment key={friend.id}>
              <label> - {friend.name} final coins</label>
              <input
                type="text"
                value={friend.balance}
                onChange={(e) =>
                  updateFriendAmount(e, e.target.value, friend.id)
                }
              />
            </Fragment>
          )
      )}
      <div className="btn-container">
        <Button onClick={() => handleReset()}> Reset !</Button>
        <Button onClick={(e) => handleBalances(e, friendsCopy, coins, cost)}>
          Balance
        </Button>
      </div>
    </form>
  );
}
