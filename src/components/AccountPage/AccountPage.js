import React from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { Grid, Box, Card } from "@mui/material";
import { SideBar } from "../SideBar/SideBar";
import { Profile } from "../Profile/Profile"
import { AccountsList } from "../AccountsList/AccountsList";
import { TransactionHistory } from "../TransactionHistory/TransactionHistory";
import { SearchModule } from "../SearchModule/SearchModule";
import { CustomerAccounts } from "../CustomerAccounts/CustomerAccounts";
import { PendingTransactions } from "../PendingTransactions/PendingTransactions";
import { StaffAcounts } from "../StaffAccounts/StaffAccounts";
import { ComplianceLogs } from "../ComplianceLogs/ComplianceLogs";
import { Transfer } from "../Transfer/Transfer";
import { TransferHistory } from "../TransferHistory/TransferHistory";
import { PendingTransfers } from "../PendingTransfers/PendingTransfers";
import { Transaction } from "../Transaction/Transaction";
export function AccountPage() {
    const location = useLocation();
    const accountType = location.state?.accountType || "user";
    const [selectedMenuItem, setSelectedMenuItem] = useState("My Profile");
    const [searchValue, setSearchValue] = useState("");
    const handleSearchChange = (e) => setSearchValue(e.target.value);

    const renderContent = () => {
        switch (selectedMenuItem) {
            case "My Profile":
                return <Profile accountType={accountType} />;
            case "Accounts":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <AccountsList accountType={accountType} searchValue={searchValue} />
                </>;
            case "Transaction History":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <TransactionHistory accountType={accountType} searchValue={searchValue} />
                </>;
            case "Make a Transaction":
                return <><Transaction accountType={accountType} /></>;
            case "Make a Transfer":
                return <><Transfer accountType={accountType} /></>;
            case "Customer Accounts":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <CustomerAccounts accountType={accountType} searchValue={searchValue} />
                </>;
            case "Pending Transactions":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <PendingTransactions accountType={accountType} searchValue={searchValue} />
                </>;
            case "Pending Transfers":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <PendingTransfers accountType={accountType} searchValue={searchValue} />
                </>;
            case "Transfer History":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <TransferHistory accountType={accountType} searchValue={searchValue} />
                </>;
            case "Manage Staff":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <StaffAcounts accountType={accountType} searchValue={searchValue} />
                </>;
            case "Compliance Logs":
                return <>
                    <SearchModule searchValue={searchValue} onSearchChange={handleSearchChange} />
                    <ComplianceLogs accountType={accountType} searchValue={searchValue} />
                </>;
            default:
                return <p>Select an option from the sidebar.</p>;
        }
    };

    return (
        <Box
            sx={{
                padding: 4,
            }}
        >
            <Grid
                container
            >
                <Grid size={{ xs: 12, sm: 4 }}>
                    <SideBar accountType={accountType}
                        onMenuSelect={setSelectedMenuItem}
                        selectedMenuItem={selectedMenuItem}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                    <Card
                        sx={{
                            height: "100%",
                            paddingLeft: "2em",
                            paddingRight: "2em",
                            alignItems: "center",
                        }}
                    >
                        <div style={{ textAlign: "center" }}>
                            <h2>{selectedMenuItem}</h2>
                            {renderContent()}
                        </div>
                    </Card>
                </Grid>


            </Grid>
        </Box>
    );
}
