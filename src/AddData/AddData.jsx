import React,{useState} from "react";
import "./AddData.css"
import data from "../assets/data.json"

function TableComponent(){
    const [searchTerm, setSearchTerm] = useState("");
    
  const [filterCity, setFilterCity] = useState("");
  const [sortBy, setSortBy] = useState("name"); // Default sorting by ID
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

    const [maxNum, setmaxNum] = useState(0)
   
  
    const max= ()=> {
        data.filter((item) => {
            if(item.attacksCount >maxNum) {
            setmaxNum(item.attacksCount)
            }
        })
    }
    
    max()
    let denger = ""

    function findDengar(){
        denger = data.find((item)=>{
                
        item.imageUrl !== null && 
        item.attacksCount == max &&
        item.status === "active"
        })
    }

    const handleClick = () => {
       
    };

    

  // Function to handle sorting
  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };
 

  
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === "asc") {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return bValue < aValue ? -1 : bValue > aValue ? 1 : 0;
    }
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name or attacks"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      
      <select
        value={filterCity}
        onChange={(e) => setFilterCity(e.target.value)}
      >
        <option value="">All Status</option>
        {[...new Set(data.map((item) => item.status))].map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
       
            <button  onClick={handleClick}>
              Find most Dangerous
            </button>

        
      

      <table border="1">
        <thead>
          <tr>
            <th   onClick={() => handleSort("name")}>  
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("organization")}>
              organization {sortBy === "organization" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("attacks")}>
              attacks {sortBy === "attacks" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("status")}>
              status {sortBy === "status" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
            <th onClick={() => handleSort("Summary")}>
              Summary {sortBy === "Summary" && (sortOrder === "asc" ? "↑" : "↓")}
            </th>
          </tr>
        </thead>
        <tbody>
          {
          sortedData
            .filter(
              (item) =>
                item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.attacksCount.toString().includes(searchTerm.toLowerCase())
            )

            .filter((item) => filterCity === "" || item.status === filterCity)
            .map((item) => (
              <tr key={item.id}>
                <td> <img src={"https://i.ibb.co/Hpf9JhhF/12.png"} alt="https://i.ibb.co/Hpf9JhhF/12.png" />  {item.name}</td>
                <td>{item.organization}</td>
                <td>{item.attacksCount}</td>
                <td>{item.status}</td>
                <td>{item.relationToIsraelSummary}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>{denger}</div>
    </div>
  );
};







// }

// const UserTable = ({ users }) => {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>organization</th>
//           <th>attacks</th>
//           <th>status</th>
//           <th>Summary</th>
//         </tr>
//       </thead>
//       <tbody>
//         {users.map(user => (
//           <tr key={user.name}>
//             <td><img src={user.imageUrl} alt="" />  {user.name}</td>
//             <td>{user.organization}</td>
//             <td>{user.attacksCount}</td>
//             <td>{user.status}</td>
//             <td>{user.relationToIsraelSummary}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   )
// }

// const AddData = () => {
//   const users = data

//   return <UserTable users={users} />
// }



export default TableComponent