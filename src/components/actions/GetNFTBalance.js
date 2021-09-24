import React from 'react';
import TextField from '../utils/TextField';
import { useForm } from 'react-hook-form';
import { Web3Context } from '../../web3';
export const GetNFTBalance = () => {
  /**
   * Form handlers
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (e) => {};
  return (
    <form
      className="w-96 my-10 text-center border-solid border-purple-300"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        label="walletAddress"
        placeholder=".."
        register={register}
        name="Wallet Address"
        errors={errors}
        rules={{ maxLength: 42, required: true, minLength: 42 }}
      />

      <input
        className="bg-purple-700 px-2 py-1 rounded text-base font-bold"
        type="submit"
        value="Get BVT Balance"
      />
    </form>
  );
};
