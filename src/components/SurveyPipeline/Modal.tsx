import React, { useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    const handleSave = () => {
      // Dummy HTTP request
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: 'foo',
          body: 'bar',
          userId: 1,
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        onClose(); // Close the modal
      });
    };

    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', width: '80%', height: '80%' }}>
          {children}
          <p>Bitte bearbeiten Sie die Frage, die Antwort, die Quelle (URL) und Ihren Namen, falls erforderlich.
          <br /><br />
              <ul>
                  <li>Klicken Sie auf <strong>Speichern</strong>, um die Änderungen in die Datenbank einzufügen.</li>
              </ul>
          </p>
          <textarea placeholder="Frage" style={{ width: '100%', height: '10%', marginBottom: '10px' }}></textarea>
          <textarea placeholder="Antwort" style={{ width: '100%', height: '40%', marginBottom: '10px'  }}></textarea>
          <textarea placeholder="Quelle URL" style={{ width: '100%', height: '10%', marginBottom: '10px' }}></textarea>
          <textarea placeholder="Mitarbeiter/in" style={{ width: '100%', height: '10%', marginBottom: '10px'  }}></textarea>
          <button onClick={onClose} style={{ display: 'flex', alignItems: 'center', position: 'absolute', top: '20px', right: '20px' }}>
            <strong style={{ color: "#ff2d00", fontSize: '20px' }}>Stornieren</strong>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                  <path
                  fill="#ff2d00" d="m12.375 4.07568a8.29151 8.29151 0 1 0 8.291 8.291 8.30111 8.30111 0 0 0 -8.291-8.291zm0 15.833a7.54151 7.54151 0 1 1 7.5415-7.542 7.5502 7.5502 0 0 1 -7.5415 7.54201z" />
                  <path fill="#ff2d00" d="m15.699 8.53-3.315 3.315-3.3-3.3-.53.531 3.3 3.299-3.284 3.284.53.53 3.284-3.283 3.299 3.299.53-.531-3.299-3.299 3.315-3.315z" />
              </svg>
          </button>
          <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', position: 'absolute', bottom: '20px', right: '20px' }}>
            <strong style={{ color: "#0daf3e", fontSize: '20px' }}>Speichern</strong>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
                <path
                fill="#0daf3e" d="m16.90039 4.70166h-12.06739v15.19922h15.05079v-11.62012zm-2.81592.75v3.84668h-6.25v-3.84668zm5.04932 13.69922h-13.55079v-13.69922h1.50147v4.59668h7.75v-4.59668h1.71436l2.585 3.10059z"/><path fill="#0daf3e" d="m12.3584 12.30713a2.292 2.292 0 1 0 2.292 2.292 2.29476 2.29476 0 0 0 -2.292-2.292zm0 3.834a1.542 1.542 0 1 1 1.542-1.542 1.54363 1.54363 0 0 1 -1.542 1.54199z"/><path fill="#0daf3e" d="m11.8999 6.06836h1.53241v2.65479h-1.53241z" />
             </svg>
          </button>
        </div>
      </div>
    );
  };

  export default Modal;