import {useState} from "react";

const initialFriends = [{
    id: 118836, name: "Clark", image: "https://i.pravatar.cc/48?u=118836", balance: -7,
}, {
    id: 933372, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20,
}, {
    id: 499476, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0,
},];

export default function App() {
    const [friends, setFriends] = useState(initialFriends);
    const [selectedFriend, setSelectedFriend] = useState(null);
    const [showAddFriend, setShowAddFriend] = useState(false);

    function handleSelection(friend) {
        setSelectedFriend(cur => cur?.id === friend?.id ? null : friend);
        setShowAddFriend(false);
        console.log("🚀 ~ App ~ selectedFriend: ", selectedFriend);
        console.log("🚀 ~ App ~ showAddFriend: ", showAddFriend);
    }

    function handleSplitBill(value) {
        setFriends(((friends) => friends.map((friend) => friend.id === selectedFriend.id ? {
                ...friend,
                balance: friend.balance + value
            }
            : friend)))
    }

    return (<div className="app">
        <div className="sidebar">
            <FriendsList friends={friends} selectedFriend={selectedFriend} onSelection={handleSelection}/>
            {showAddFriend && <FormAddFriend/>}
            <Button>{showAddFriend ? "Close" : "Add friend"}</Button>
            {selectedFriend && (
                <FormSplitBill selectedFriend={selectedFriend} onSplitBill={handleSplitBill} key={selectedFriend.id}/>)}
        </div>
    </div>)
}

function FriendsList({friends, onSelection, selectedFriend}) {
    return (<ul>
        {friends.map((friend) => (
            <Friend key={friend.id} friend={friend} onSelection={onSelection} selectedFriend={selectedFriend}/>))}
    </ul>)
}

function Friend({friend, selectedFriend, onSelection}) {
    const isSelected = selectedFriend?.id === friend.id;

    return (<li className={isSelected ? 'selected' : ''}>
        <img src={friend.image} alt={friend.name}/>
        <h3>{friend.name}</h3>'

        {friend.balance < 0 && (
            <p className="red">You owe {friend.name} {Math.abs(friend.balance)}€</p>
        )}

        {friend.balance > 0 && (
            <p className="green">{friend.name} owes you {Math.abs(friend.balance)}€</p>
        )}

        {friend.balance === 0 && (<p>You and {friend.name} are even</p>)}

        <Button onClick={() => onSelection(friend)}>
            {isSelected ? "Close" : "Select"}
        </Button>
    </li>)
}

function FormAddFriend() {
    return (<form>
        <label>👫 Friend name</label>
        <input type="text" name="name" placeholder="Name"/>
        <label>🌄 Image URL</label>
        <input type="text" name="image" placeholder="Image URL"/>
        <Button children={"Add"} onClick={() => {
        }}/>
    </form>)
}

function FormSplitBill() {
    return (<form className="form-split-bill">
        <h2>Split a bill with</h2>
        <label>💰 Bill value</label>
        <input
            type="text"
        />
        <label>🧍‍♀️ Your expense</label>
        <input
            type="text"
        />
        <label>👫 name's expense</label>
        <input type="text" disabled/>
        <label>🤑 Who is paying the bill</label>
        <select

        >
            <option value="user">You</option>
            <option value="friend">name</option>
        </select>
        <Button>Split bill</Button>
    </form>)
}

function Button({children, onClick}) {
    return (<button className="button" onClick={onClick}>{children}</button>)
}
