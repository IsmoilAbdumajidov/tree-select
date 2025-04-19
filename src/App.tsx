import TreeSelect from "./components/TreeSelect"
import { Category } from "./types/types";

const App = () => {
  const data: Category[] = [
    {
      id: 0,
      name: "fruit",
      items: ["apple", "banana", "orange", "grape", "kiwi", "mango"],
    },
    {
      id: 1,
      name: "vegetable",
      items: ["carrot", "broccoli", "spinach", "potato", "tomato", "cucumber"],
    },
    {
      id: 2,
      name: "meat",
      items: [],
    },
    {
      id: 3,
      name: "dairy",
      items: ["milk", "cheese", "yogurt", "butter"],
    },
  ];
  return (
    <div>
      <TreeSelect data={data} />
    </div>
  )
}

export default App