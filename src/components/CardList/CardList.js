import React, { useEffect, useState } from 'react';
import { DetailsOverlay } from "../DetailsOverlay/DetailsOverlay";

const CardList = () => {
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    fetch('https://bank-uml.onrender.com/accounts')
      .then(res => res.json())
      .then(data => setAccounts(data))
      .catch(err => console.error('Fetch accounts error:', err));
  }, []);

  const handleViewDetails = (account) => {
    setSelectedAccount(account);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedAccount(null);
  };

  const handleSaveChanges = (updatedFields) => {
    // PATCH request to update account fields
    fetch(`https://bank-uml.onrender.com/account/${selectedAccount.card_number}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedFields)
    })
      .then(res => res.json())
      .then(() => {
        // Refresh accounts list
        fetch('https://bank-uml.onrender.com/accounts')
          .then(res => res.json())
          .then(data => setAccounts(data));
        handleCloseOverlay();
      })
      .catch(err => console.error('Patch account error:', err));
  };

  return (
    <div>
      <h2>All Accounts</h2>
      <div className="card-list">
        {accounts.map(account => (
          <div key={account.card_number} className="account-card">
            <div>Card Number: {account.card_number}</div>
            <div>Balance: {account.balance}</div>
            <div>Type: {account.account_type}</div>
            <button onClick={() => handleViewDetails(account)}>View Details &gt;</button>
          </div>
        ))}
      </div>
      {showOverlay && (
        <DetailsOverlay
          data={selectedAccount}
          editable={true}
          onClose={handleCloseOverlay}
          onSave={handleSaveChanges}
        />
      )}
    </div>
  );
};

export default CardList;
