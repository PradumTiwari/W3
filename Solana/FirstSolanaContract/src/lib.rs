use solana_program::{
    account_info::{next_account_info,AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError,
}

entrypoint!(process_instruction);


pub fn process_instruction(
    _program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8],
)->ProgramResult{

    msg!("Hello from solana core program");
    let account_iter=&mut accounts.iter();
    let account=next_account_info(account_iter)?;

    let data=&mut *account.try_borrow_mut_data()?;
    data[0]=data[0].wrapping_add(1);
    msg!("Value is now {}",data[0]);
    Ok(())
}