// import React, { useState } from 'react';
// import { Table, Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';
//  // Assuming you'll add your custom CSS here

// const TableComponent = ({ columns, data, onUpdate }) => {
//   const [showModal, setShowModal] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);

//   const [updatedData, setUpdatedData] = useState({
//     nomPrenom: '',
//     entreprise: '',
//     telephone: '',
//     adresse: '',
//     email: '',
//     agentId: '',
//     idRdv: '',
//     dateRdv: '',
//     typeRdv: '',
//     commentaire: '',
//     siret: '',
//     statut: '',
//   });

//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setUpdatedData(row); // Pre-fill the modal with the row data
//     setShowModal(true); // Show the modal
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUpdatedData({ ...updatedData, [name]: value });
//   };

//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put('http://your-api-url/clients/' + updatedData.idRdv, updatedData);

//       if (response.status === 200) {
//         alert('Client updated successfully');
//         onUpdate(updatedData);
//         setShowModal(false);
//       }
//     } catch (error) {
//       console.error('Error updating client:', error);
//       alert('Failed to update client');
//     }
//   };

//   return (
//     <>
//       <Table striped bordered hover responsive>
//         <thead>
//           <tr>
//             {columns.map((col, index) => (
//               <th key={index}>{col.header}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((row, rowIndex) => (
//             <tr key={rowIndex} onClick={() => handleRowClick(row)}>
//               {columns.map((col, colIndex) => (
//                 <td key={colIndex}>
//                   {col.field === 'statut' ? (
//                     <span className={`badge ${row[col.field] === 'Confirmed' ? 'bg-success' : row[col.field] === 'Installation' ? 'bg-warning' : 'bg-danger'}`}>
//                       {row[col.field]}
//                     </span>
//                   ) : (
//                     row[col.field]
//                   )}
//                 </td>
//               ))}
//             </tr>
//           ))}
//         </tbody>
//       </Table>

//       {/* Modal for editing */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" className="custom-modal">
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Client Information</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             {/* Row 1: NOM / PRENOM and NOM ENTREPRISE on the same line */}
//             <div className="d-flex gap-4 mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formNomPrenom">
//                   <Form.Label>NOM / PRENOM</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="nomPrenom"
//                     value={updatedData.nomPrenom}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="flex-fill">
//                 <Form.Group controlId="formEntreprise">
//                   <Form.Label>NOM ENTREPRISE</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="entreprise"
//                     value={updatedData.entreprise}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 2: TELEPHONE and ADRESSE on the same line */}
//             <div className="d-flex gap-4 mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formTelephone">
//                   <Form.Label>TELEPHONE</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="telephone"
//                     value={updatedData.telephone}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="flex-fill">
//                 <Form.Group controlId="formAdresse">
//                   <Form.Label>ADRESSE</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="adresse"
//                     value={updatedData.adresse}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 3: EMAIL and AGENT ID on the same line */}
//             <div className="d-flex gap-4 mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formEmail">
//                   <Form.Label>Email</Form.Label>
//                   <Form.Control
//                     type="email"
//                     name="email"
//                     value={updatedData.email}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="flex-fill">
//                 <Form.Group controlId="formAgentId">
//                   <Form.Label>Agent ID</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="agentId"
//                     value={updatedData.agentId}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 4: ID RDV and DATE RDV on the same line */}
//             <div className="d-flex gap-4 mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formIdRdv">
//                   <Form.Label>ID-RDV</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="idRdv"
//                     value={updatedData.idRdv}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="flex-fill">
//                 <Form.Group controlId="formDateRdv">
//                   <Form.Label>DATE RDV</Form.Label>
//                   <Form.Control
//                     type="date"
//                     name="dateRdv"
//                     value={updatedData.dateRdv}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 5: TYPE RDV */}
//             <div className="d-flex mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formTypeRdv">
//                   <Form.Label>TYPE RDV</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="typeRdv"
//                     value={updatedData.typeRdv}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 6: SIRET and STATUT on the same line */}
//             <div className="d-flex gap-4 mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formSiret">
//                   <Form.Label>SIRET</Form.Label>
//                   <Form.Control
//                     type="text"
//                     name="siret"
//                     value={updatedData.siret}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//               <div className="flex-fill">
//                 <Form.Group controlId="formStatut">
//                   <Form.Label>STATUT</Form.Label>
//                   <Form.Control
//                     as="select"
//                     name="statut"
//                     value={updatedData.statut}
//                     onChange={handleChange}
//                   >
//                     <option>Confirmed</option>
//                     <option>Installation</option>
//                     <option>Cancelled</option>
//                   </Form.Control>
//                 </Form.Group>
//               </div>
//             </div>

//             {/* Row 7: COMMENTAIRE AGENT (Textarea) */}
//             <div className="d-flex mb-4">
//               <div className="flex-fill">
//                 <Form.Group controlId="formCommentaire">
//                   <Form.Label>COMMENTAIRE AGENT</Form.Label>
//                   <Form.Control
//                     as="textarea"
//                     rows={4}
//                     name="commentaire"
//                     value={updatedData.commentaire}
//                     onChange={handleChange}
//                   />
//                 </Form.Group>
//               </div>
//             </div>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setShowModal(false)}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleUpdate}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };
// export default TableComponent;
