use solana_program::{
    account_info::{next_account_info,AccountInfo}, entrypoint::{self, ProgramResult}, example_mocks::solana_sdk::system_program, lamports, msg, program::invoke, program_error::ProgramError, pubkey::Pubkey, system_instruction, sysvar::{rent::Rent,Sysvar}
};

entrypoint!(program_instruction);

pub fn program_instruction(
    _program_id:&Pubkey,
    accounts:&[AccountInfo],
    _instruction_data:&[u8],
)->ProgramResult{

    //Step 1 get accounts
    let account_info_iter=&mut accounts.iter();

    let payer=next_account_info(account_info_iter)?;

    let new_account=next_account_info(account_info_iter)?;

    let system_program=next_account_info(account_info_iter)?;


    //step 2 :Define size and rent

    let space=1;
    let rent=Rent::get()?;
    let lamports=rent.minimum_balance(space);
    //Create Instruction

    let create_account_ix=system_instruction::create_account(
        payer.key, new_account.key, lamports,
         space as u64,
         _program_id,
        );

        //Step-4 call the system Program

        invoke(&create_account_ix,
        &[payer.clone(),new_account.clone(),system_program.clone()],
        )?;

        //Step 5 write data to the new account

        let data=&mut *new_account.try_borrow_mut_data()?;
        data[0]=100;

        msg!("New Account Created and Intialized");

        


                                                                            

    Ok(())

}