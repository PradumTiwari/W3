use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    program::{invoke_signed},
    program_error::ProgramError,
    program_pack::Pack,
    pubkey::Pubkey,
    rent::Rent,
    system_instruction,
    sysvar::{rent::ID as RENT_SYSVAR_ID, Sysvar},
    msg,
};

mod state;

use crate::state::VaultAccount;

pub const VAULT_ACCOUNT_SIZE: usize = 8 + 1; // u64 (8 bytes) + bool (1 byte)



entrypoint!(process_instruction);

pub fn process_instruction(

     program_id:&Pubkey,
     accounts:&[AccountInfo],
     _instruction_data:&[u8],
)->ProgramResult{

    let account_info_iter=&mut accounts.iter();
    let signer=next_account_info(account_info_iter)?;
    let vault_account=next_account_info(account_info_iter)?;
    let system_program=next_account_info(account_info_iter)?;



    //Derive the PDA

    let (valut_pda,bump)=Pubkey::find_program_address(
        &[b"valut",signer.key.as_ref()],
         program_id,
        );

        //Check if the user passed correct PDA
        if valut_pda!=*vault_account.key{
             msg!("Invalid PDA");
        return Err(ProgramError::InvalidArgument);
        }

        //Allocated PDA if not already initialized
        if vault_account.data_is_empty(){
             let rent = Rent::get()?;
        let rent_lamports = rent.minimum_balance(VAULT_ACCOUNT_SIZE);

        let create_account_ix=system_instruction::create_account(signer.key, vault_account.key, rent_lamports, VAULT_ACCOUNT_SIZE as u64, program_id);

          let seeds = &[b"vault", signer.key.as_ref(), &[bump]];
     
     
       invoke_signed(&create_account_ix, &[signer.clone(),vault_account.clone(),system_program.clone()], &[seeds]);
     
     
      let mut valut_data=VaultAccount{
        balance:0,
        is_initialized:true,
      };

      valut_data.serialize(&mut &mut vault_account.data.borrow_mut()[..])?;
      msg!("Vauld pda initialized successfully");

     
        }

        else{
            msg!("Vauld pda already initalized")
        }







Ok(())
}
