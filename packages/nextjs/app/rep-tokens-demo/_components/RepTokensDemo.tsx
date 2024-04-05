"use client";

import { useAccount } from "wagmi";
import { StylizedAddressCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedAddressCard";
import { StylizedBalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedBalanceCard";
import { StylizedImageCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedImageCard";
import { StylizedStringCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedStringCard";
import { StylizedTokenCard } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard";
import { StylizedTokenCard2 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenCard2";
// import {
//   ReputationComponent,
//   StylizedTokenGroupCard,
// } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard";
import { AddressCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/AddressCard";
import { BalanceCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/BalanceCard";
// import { StylizedTokenGroupCard2 } from "~~/components/rep-tokens/cards/stylized-cards/StylizedTokenGroupCard2";
import { DescriptionCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/DescriptionCard";
import { ImageCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/ImageCard";
import { MaxMintAmountPerTxCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/MaxMintAmountPerTxCard";
import { NameCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/NameCard";
import { RedeemableCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/RedeemableCard";
import { SoulboundCard } from "~~/components/rep-tokens/cards/stylized-cards/token-properties/SoulboundCard";
import { useGetRepToken } from "~~/components/rep-tokens/hooks/Hooks";

// import { useScaffoldContract, useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

export function RepTokensDemo() {
  const { address } = useAccount();

  const { token } = useGetRepToken(address, BigInt(0));

  token.image = token?.image?.replace("ipfs://", "https://ipfs.io/ipfs/");

  // const { tokensData, refetchBalances: refetchUserBalances } = useRepTokens(address);

  // for (let i = 0; i < tokensData.tokens.length; i++) {
  //   tokensData.tokens[i].image = tokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  // }

  // const { writeAsync: claim } = useScaffoldContractWrite({
  //   contractName: "ReputationFaucet",
  //   functionName: "claim",
  // });

  // const { data: faucet } = useScaffoldContract({ contractName: "ReputationFaucet" });

  // const { tokensData: faucetTokensData, refetchBalances: refetchFaucetBalances } = useRepTokens(faucet?.address);

  // for (let i = 0; i < faucetTokensData.tokens.length; i++) {
  //   faucetTokensData.tokens[i].image = faucetTokensData.tokens[i].image?.replace("ipfs://", "https://ipfs.io/ipfs/");
  // }

  // const mainComponents: ReputationComponent[] = [
  //   "Balance",
  //   "Image",
  //   "Name",
  //   "Description",
  //   "Address",
  //   "IsSoulbound",
  //   "IsRedeemable",
  //   "MaxMintAmountPerTx",
  // ];

  // const widgetComponents: ReputationComponent[] = ["Balance", "Image"];

  return (
    <>
      <div className="py-5 space-y-5 flex flex-col justify-center items-center bg-[length:100%_100%] py-1 px-5 sm:px-0 lg:py-auto max-w-[100vw] ">
        {/* <StylizedTokenGroupCard
          tokens={faucetTokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
        >
          <StylizedStringCard value={"Faucet"} />
        </StylizedTokenGroupCard>
        <button
          className="btn btn-primary btn-sm font-normal gap-1"
          onClick={async () => {
            await claim();
            await refetchUserBalances();
            await refetchFaucetBalances();
          }}
        >
          Claim Tokens
        </button> */}

        {/* <StylizedTokenGroupCard2 tokens={tokensData.tokens} components={mainComponents}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard2> */}

        <div className="flex">
          <div>
            <p className="text-center text-4xl">Individual Components 1</p>
            <StylizedBalanceCard value={Number(token?.balance)} />
            <StylizedImageCard src={token?.image} />
            <StylizedStringCard value={token?.name} type="bold" />
            <StylizedStringCard value={token?.description} />
            <StylizedAddressCard address={token?.address} />
            <StylizedStringCard value={`Soulbound: ${token?.properties?.isSoulbound?.toString()}`} />
            <StylizedStringCard value={`Redeemable: \n ${token?.properties?.isRedeemable?.toString()}`} />
            <StylizedStringCard
              value={`Max Mint Amount Per Tx: \n${token?.properties?.maxMintAmountPerTx?.toString()}`}
            />
          </div>

          <div>
            <p className="text-center text-4xl">Individual Components 2</p>
            <BalanceCard balance={token?.balance} />
            <ImageCard src={token?.image} />
            <NameCard name={token?.name} />
            <DescriptionCard description={token?.description} />
            <AddressCard address={token?.address} />
            <SoulboundCard isSoulbound={token?.properties?.isSoulbound} />
            <RedeemableCard isRedeemable={token?.properties?.isRedeemable} />
            <MaxMintAmountPerTxCard maxMintAmountPerTx={token?.properties?.maxMintAmountPerTx} />
          </div>

          <div>
            <p className="text-center text-4xl">Individual Components 3</p>
            <BalanceCard token={token} />
            <ImageCard token={token} />
            <NameCard token={token} />
            <DescriptionCard token={token} />
            <AddressCard token={token} />
            <SoulboundCard token={token} />
            <RedeemableCard token={token} />
            <MaxMintAmountPerTxCard token={token} />
          </div>
        </div>

        <div className="flex">
          <div>
            <p className="text-center text-4xl">Single Card 1</p>
            <StylizedTokenCard token={token} />
          </div>
          <div>
            <p className="text-center text-4xl">Single Card 2</p>
            <StylizedTokenCard2>
              <StylizedBalanceCard value={Number(token?.balance)} />
              <StylizedImageCard src={token?.image} />

              <StylizedStringCard value={token?.name} type="bold" />
              <StylizedStringCard value={token?.description} />
              <StylizedAddressCard address={token?.address} />
              <StylizedStringCard value={`Soulbound: ${token?.properties?.isSoulbound?.toString()}`} />
              <StylizedStringCard value={`Redeemable: \n ${token?.properties?.isRedeemable?.toString()}`} />
              <StylizedStringCard
                value={`Max Mint Amount Per Tx \n${token?.properties?.maxMintAmountPerTx?.toString()}`}
              />
            </StylizedTokenCard2>
          </div>

          <div>
            <p className="text-center text-4xl">Single Card 3</p>
            <StylizedTokenCard2>
              <BalanceCard token={token} />
              <ImageCard token={token} />
              <NameCard token={token} />
              <DescriptionCard token={token} />
              <AddressCard token={token} />
              <SoulboundCard token={token} />
              <RedeemableCard token={token} />
              <MaxMintAmountPerTxCard token={token} />
            </StylizedTokenCard2>
          </div>
        </div>

        {/* <p className="text-center text-4xl">Multi-Card</p>

        <StylizedTokenGroupCard tokens={tokensData.tokens} components={mainComponents}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard>

        <p className="text-center text-4xl">Multi-Card W/ Overlay</p>

        <StylizedTokenGroupCard tokens={tokensData.tokens} components={mainComponents} isBalanceOverlayed={true}>
          <StylizedAddressCard address={tokensData.address} isGroup={true} />
        </StylizedTokenGroupCard>

        <p className="text-center text-4xl">Small</p>

        <StylizedTokenGroupCard
          tokens={tokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="sm"
        />

        <p className="text-center text-4xl">Widget</p>

        <StylizedTokenGroupCard
          tokens={tokensData.tokens}
          components={widgetComponents}
          isBalanceOverlayed={true}
          size="xs"
        /> */}
      </div>
    </>
  );
}
