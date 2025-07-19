use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    pubkey::Pubkey,
};

#[derive(BorshSerialize, BorshDeserialize, Debug)]
pub struct Counter {
    pub count: u32,
}

// Declare the entrypoint of the program
entrypoint!(process_instruction);

// Main logic of the program
fn process_instruction(
    _program_id: &Pubkey,       // ID of the program
    accounts: &[AccountInfo],   // Account passed from client
    _instruction_data: &[u8],   // Not used in this example
) -> ProgramResult {
    msg!("Simple Counter Program");

    let accounts_iter = &mut accounts.iter();
    let counter_account = next_account_info(accounts_iter)?; // Get first account

    let mut counter_data = Counter::try_from_slice(&counter_account.data.borrow())?;
    msg!("Current count: {}", counter_data.count);

    counter_data.count += 1;
    counter_data.serialize(&mut &mut counter_account.data.borrow_mut()[..])?;

    msg!("Counter incremented to: {}", counter_data.count);
    Ok(())
}
