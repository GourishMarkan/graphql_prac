import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutation";
import { GET_CLIENTS } from "../queries/clientQuery";

const ClientRow = ({ client }) => {
  // const [deleteClient] = useMutation(DELETE_CLIENT, {
  //   variables: { id: client.id },
  // });
  console.log(client, client.id);
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    // variables: { id: client.id },
    // refetchQueries: [{ query: GET_CLIENTS }],
    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  if (!client) {
    return null; // Return null if client is not defined
  }
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteClient({ variables: { id: client.id } })}
        >
          <FaTrash />
        </button>
      </td>
    </tr>
  );
};

export default ClientRow;
