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
export function AccountPage() {
    const location = useLocation();
    const accountType = location.state?.accountType || "user";
    const [selectedMenuItem, setSelectedMenuItem] = useState("My Profile");
    const renderContent = () => {
        switch (selectedMenuItem) {
            case "My Profile":
                return <Profile accountType={accountType} />;
            case "Accounts":
                return <><SearchModule /><AccountsList accountType={accountType}/></>;
            case "Transaction History":
                return <><SearchModule /><TransactionHistory accountType={accountType}/></>;
            case "Customer Accounts":
                return <><SearchModule /><CustomerAccounts accountType={accountType} /></>;
            case "Pending Transactions":
                return <><SearchModule /><PendingTransactions accountType={accountType} /></>;
            case "Manage Staff":
                return <><SearchModule /><StaffAcounts/></>;
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
