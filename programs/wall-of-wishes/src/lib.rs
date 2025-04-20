
use anchor_lang::prelude::*;

declare_id!("7QRnXadqnH4A8zx8nEuQLmPASw8W4rV6URDn1ktmx5Hh");

#[program]
pub mod wall_of_wishes {
    use super::*;

    pub fn create_wish(ctx: Context<CreateWish>, title: String) -> Result<()> {
        let wish = &mut ctx.accounts.wish;
        wish.title = title;
        wish.creator = ctx.accounts.creator.key();
        wish.timestamp = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct CreateWish<'info> {
    #[account(
        init,
        payer = creator,
        space = 8 + 32 + 32 + 8 + 200,
        seeds = [b"wish", creator.key().as_ref(), title.as_bytes()],
        bump
    )]
    pub wish: Account<'info, Wish>,
    
    #[account(mut)]
    pub creator: Signer<'info>,
    
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Wish {
    pub title: String,
    pub creator: Pubkey,
    pub timestamp: i64,
}
