use solana_program::{
    account_info::{next_account_info,AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError,
};

entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8],
)->ProgramResult{

  let account=next_account_info(&mut accounts.iter())?;
  let data=&mut *account.try_borrow_mut_data()?;

  let counter = &mut data[0];  // get the first byte

    match instruction_data {
        [0] => {
            *counter = counter.wrapping_add(1); // add 1
        }
        [1] => {
            *counter = counter.wrapping_sub(1); // subtract 1
        }
        [2] => {
            *counter = 0; // reset to 0
        }
        _ => {
            return Err(ProgramError::InvalidInstructionData); // reject invalid
        }
    }
        Ok(())
  }
