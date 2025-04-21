import Layout from "./Layout";
import fetch from "isomorphic-unfetch";

export default function Pets(props) {
  return (
    <Layout>
      <div>
        <h1>Pets!</h1>
        <ul>
          {props.pets.map(pet => (
            <li key={pet.id}>{pet.name}</li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

Pets.getInitialProps = async function () {
    const res = await fetch("https://petstore.swagger.io/v2/pet/findByStatus?status=available");
    const data = await res.json();
    console.log("API Response:", data); // 👈 Log it!
  
    return {
      pets: Array.isArray(data) ? data : [] // ✅ Defensive check
    };
  };
  
  