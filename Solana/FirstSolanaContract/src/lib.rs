use solana_program::{
    account_info::{next_account_info,AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    pubkey::Pubkey,
    msg,
    program_error::ProgramError,
};

entrypoint!(process_instruction);

pub enum CounterInstruction{
    Increment,
    Decrement,
    Reset,
}

impl CounterInstruction{
    pub fn unpack(input:&[u8])->Result<Self,ProgramError>{
        let (&tag,_)=input.split_first().ok_or(ProgramError::InvalidInstructionData)?;

        match tag{
            0=>Ok(Self::Increment),
            1=>Ok(Self::Decrement),
            2=>Ok(Self::Reset),
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
    let data=&mut *account.try_borrow_mut_data()?;
    let counter = &mut data[0];

    let instruction=CounterInstruction::unpack(instruction_data)?;

    match instruction{
        CounterInstruction::Increment=>{
            *counter=counter.wrapping_add(1);
        }

        CounterInstruction::Decrement=>{
            *counter=counter.wrapping_sub(1);
        }

        CounterInstruction::Reset=>{
            *counter=0;
        }
    }


    Ok(())
}