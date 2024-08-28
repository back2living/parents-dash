// interface IPointInput {
//     label?: string;
//     placeholder?: string;
//     name?:string;
//     register?: any;
//     errors?: any;
// }
//
// const PointsInput = ({placeholder="How much", label="Points", name, register, errors}: IPointInput) => {
//     return (
//         <div>
//             <label className={"auth-label"} htmlFor="">{label}</label>
//             <div className={"w-full relative rounded-[100px]"}>
//                 <input {...register(name, {valueAsNumber: true})} className={`password-input`} type={"number"} placeholder={placeholder}/>
//                 <p className={"w-fit absolute top-1/2 right-4 -translate-y-1/2 text-[#B1B1B1] font-medium"}>pts</p>
//             </div>
//             {errors?.points && <span className={"auth-form-error mt-2"}>{errors?.points?.message}</span>}
//         </div>
//     );
// };
//
// export default PointsInput;