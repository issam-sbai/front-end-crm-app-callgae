import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`http://192.168.100.26:5000/api/clients/${id}`);
        if (!response.ok) throw new Error('Client not found');
        const data = await response.json();
        
        // Log the client data to the console
        // console.log('Client Data:', data);

        setClient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  if (loading) return <p>Loading client details...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold">{client.nomPrenom}</h2>
      <p><strong>Email:</strong> {client.email}</p>
      <p><strong>Phone 1:</strong> {client.telephone}</p>
      <p><strong>Phone 2:</strong> {client.telephone2}</p>
      <p><strong>Company:</strong> {client.entreprise}</p>
      <p><strong>Address:</strong> {client.adresse}, {client.cp}</p>
      <p><strong>Agent ID:</strong> {client.agentId}</p>
      <p><strong>Rendez-vous Date:</strong> {new Date(client.dateRdv).toLocaleDateString()}</p>
      <p><strong>Type:</strong> {client.typeRdv}</p>
      <p><strong>Status:</strong> {client.statut}</p>
      <p><strong>SIRET:</strong> {client.siret}</p>
      <p><strong>Comment:</strong> {client.commentaire}</p>
      <button onClick={() => window.history.back()} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
        Back to Clients
      </button>
    </div>
  );
};

export default ClientDetails;
