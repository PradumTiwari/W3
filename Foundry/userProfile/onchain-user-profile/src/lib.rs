use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::{
    account_info::{next_account_info, AccountInfo}, address_lookup_table::instruction, entrypoint::{self, ProgramResult},entrypoint, msg, program_error::ProgramError, pubkey::Pubkey
};


#[derive(BorshDeserialize,BorshSerialize,Debug)]

pub struct UserProfile{
    pub age:u8,
    pub gender:u8,
    pub is_initialized:bool,
}


#[derive(Debug)]

pub enum UserInstruction{
    InitializeProfile{age:u8,gender:u8},
    UpdateAge{new_age:u8},
    ResetProfile,
}

impl UserInstruction{
    pub fn unpack(input:&[u8])->Result<Self,ProgramError>{
        
        match input[0]{
            0=>Ok(Self::InitializeProfile { age:input[1], gender: input[2] }),
            1=>Ok(Self::UpdateAge { new_age:input[1] }),
            2=>Ok(Self::ResetProfile),
            _=>Err(ProgramError::InvalidInstructionData),
        }
    }
}

entrypoint!(process_instruction);

pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction=UserInstruction::unpack(instruction_data)?;
    let accounts_iter=&mut accounts.iter();

    let account=next_account_info(accounts_iter)?;

    let mut profile=UserProfile::try_from_slice(&account.data.borrow())?;

    match instruction{
        UserInstruction::InitializeProfile { age, gender }=>{
             if profile.is_initialized {
                return Err(ProgramError::AccountAlreadyInitialized);
            }
            profile.age = age;
            profile.gender = gender;
            profile.is_initialized = true;
        }

        UserInstruction::UpdateAge { new_age }=>{
             if !profile.is_initialized {
                return Err(ProgramError::UninitializedAccount);
            }
            profile.age = new_age; 
        }

         UserInstruction::ResetProfile => {
            profile.age = 0;
            profile.gender = 0;
            profile.is_initialized = false;
        }
    }

    profile.serialize(&mut &mut account.data.borrow_mut()[..])?;

    msg!("Updated Profile {:?}",profile);

    Ok(())





}