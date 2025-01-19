import { useQuery } from "@apollo/client";
import Spinner from "./Spinner";
import { GET_CLIENTS } from "../queries/clientQuery";
import ClientRow from "./ClientROw";

const Client = () => {
  const { data, loading, error } = useQuery(GET_CLIENTS);
  if (loading) return <Spinner />;
  console.log(data);
  if (error) return <p>{error.message}</p>;
  return (
    <>
      {!loading && !error && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default Client;
