use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program::invoke_signed,
    program_error::ProgramError,
    pubkey::Pubkey,
    system_instruction,
};


entrypoint!(process_instruction);

fn process_instruction(
  program_id:&Pubkey,
  accounts:&[AccountInfo],
  instruction_data:&[u8],
)->ProgramResult{

  let iter=&mut accounts.iter();

  let payer_account=next_account_info(iter)?;

  let pda_account=next_account_info(iter)?;

  let system_program=next_account_info(iter)?;

  let payer_pubkey=payer_account.key;

  let seeds=&[b"client1",payer_account.key.as_ref()];

  let (pda,bump)=Pubkey::find_program_address(seeds, system_program.key);

  if pda!=*pda_account.key{
    return Err(solana_program::program_error::ProgramError::AccountAlreadyInitialized);
  } 

   let lamports = 1_000_000_000; // 1 SOL
    let space = 4; // Reserve space
    let create_account_ix = system_instruction::create_account(
        payer_account.key,
        &pda,
        lamports,
        space,
        program_id,
    );
    msg!("📦 Sending invoke_signed");

    invoke_signed(
        &create_account_ix,
        &[payer_account.clone(), pda_account.clone(), system_program.clone()],
        &[&[b"client1", payer_account.key.as_ref(), &[bump]]],
    )?;





  Ok(())


}