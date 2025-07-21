use borsh::{BorshDeserialize, BorshSerialize};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct VaultAccount {
    pub balance: u64,
    pub is_initialized: bool,
}
