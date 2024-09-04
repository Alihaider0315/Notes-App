import React from 'react';

export default function DeleteModal({ handelNotesDelete }) {
  return (
    <>
      <div id="deleteEmployeeModal" className="modal fade" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Delete Notes</h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete these Records?</p>
              <p className="text-warning">
                <small>This action cannot be undone.</small>
              </p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={handelNotesDelete} data-bs-dismiss="modal">
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
