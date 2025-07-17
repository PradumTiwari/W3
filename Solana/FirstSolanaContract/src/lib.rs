use solana_program::{
    account_info::{next_account_info,AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError
};

entrypoint!(process_instruction);

use borsh::{BorshDeserialize,BorshSerialize};

#[derive(BorshSerialize,BorshDeserialize,Debug)]

pub struct Counter{
    pub count:u8,
}


pub enum CounterInstruction{
    Increment,
    Decrement,
    Reset,
}

impl CounterInstruction{
    pub fn unpack(input:&[u8])->Result<Self,ProgramError>{
        match input{
            [0]=>Ok(Self::Increment),
            [1]=>Ok(Self::Decrement),
            [2]=>Ok(Self::Reset),
            _=>Err(ProgramError::InvalidInstructionData),
        }
    }
}

pub fn process_instruction(
    _program_id:&Pubkey,
    accounts:&[AccountInfo],
    instruction_data:&[u8],
)->ProgramResult{

    let account=next_account_info(&mut accounts.iter())?;
    let data=account.try_borrow_mut_data()?;

    //Deserialize the counter from the byte array
    let mut counter=Counter::try_from_slice(&data)?;

    //Decode the instruction
    let instruction=CounterInstruction::unpack(instruction_data)?;

    match instruction{
        CounterInstruction::Decrement=>{
            msg!("Decrementing");
            counter.count=counter.count.wrapping_sub(1);

        }
        CounterInstruction::Increment=>{
            msg!("Incrementing");
            counter.count=counter.count.wrapping_add(1);
        }
        CounterInstruction::Reset=>{
            msg!("Reseting");
            counter.count=0;
        }
    }
  
  //serialize the counter back to bytes
  counter.serialize(&mut *data)?;

     Ok(())
}