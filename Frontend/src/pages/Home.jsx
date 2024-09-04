import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import Cookies from 'js-cookie';
import $ from 'jquery';
import Notes from '../components/Notes';
import Navbar from '../components/Navbar';
import { delet, get, post, put } from '../services/ApiEndPoint';
import Modal from '../components/Modal';
import toast from 'react-hot-toast';
import EidtModal from '../components/EidtModal';
import DeleteModal from '../components/DeleteModal';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [updatetitle, setUpdatetitle] = useState('');
  const [modalId, setModalId] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNoteSubmit = async () => {
    try {
      const request = await post('/notes/createnote', { title });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log('Error creating note:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const request = await put(`/notes/updatenotes/${modalId}`, { title: updatetitle });
      const response = request.data;
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
        window.$('#eiditModal').modal('hide'); // Hide edit modal after successful update
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      }
      console.log('Error updating note:', error);
    }
  };

  const handleNotesDelete = async () => {
    try {
      console.log('Deleting note with ID:', modalId); // Debug log
      const request = await delet(`/notes/deletenotes/${modalId}`);
      const response = request.data;
      console.log('Delete Response:', response); // Debug log
      if (response.success) {
        toast.success(response.message);
        setRefresh(!refresh);
        window.$('#deleteEmployeeModal').modal('hide'); // Hide delete modal after successful deletion
      } else {
        toast.error('Failed to delete the note');
      }
    } catch (error) {
      console.log('Delete Error:', error); // Log the error
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        // toast.error('An error occurred while deleting the note');
      }
    }
  };

  useEffect(() => {
    const getNotes = async () => {
      try {
        const request = await get('/notes/getnotes');
        const response = request.data;
        setNotes(response.Notes);
      } catch (error) {
        console.log('Error fetching notes:', error);
      }
    };
    getNotes();
  }, [refresh]);

  return (
    <>
      <Modal
        Modaltitle="Write Notes"
        value={title}
        handleChange={(e) => setTitle(e.target.value)}
        handleNoteSubmit={handleNoteSubmit}
      />
      <EidtModal
        Modaltitle="Updated Notes"
        handleChange={(e) => setUpdatetitle(e.target.value)}
        handleNoteSubmit={handleUpdate}
        value={updatetitle}
      />
      <DeleteModal handelNotesDelete={handleNotesDelete} />
      <div className="row">
        <div className="col-lg-2 col-md-2 shadow d-flex min-vh-100">
          <SideBar />
        </div>
        <div className="col-lg-10 col-md-10">
          <Navbar />
          {notes.length > 0 ? (
            <div className="mt-3 mx-5">
              <h1 className="fs-2 fw-bold">NOTES</h1>
            </div>
          ) : (
            <div className="mt-5 justify-content-center d-flex align-items-center">
              <h1 className="fs-1 fw-bold">No Notes Found</h1>
            </div>
          )}
          <div className="mt-4 mx-5 row">
            {notes.map((note) => (
              <div className="col-lg-4 col-md-4 mb-5" key={note._id}>
                <Notes
                  title={note.title}
                  date={formatDate(note.updatedAt)}
                  handleUpdate={() => {
                    setModalId(note._id);
                    setUpdatetitle(note.title);
                    window.$('#eiditModal').modal('show'); // Show edit modal
                  }}
                  handleDelete={() => {
                    setModalId(note._id);
                    window.$('#deleteEmployeeModal').modal('show'); // Show delete modal
                  }}
                  openDropdownId={openDropdownId}
                  setOpenDropdownId={setOpenDropdownId}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
