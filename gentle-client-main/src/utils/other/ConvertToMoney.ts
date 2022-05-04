
export const MoneyConverter = (value : number) =>{

   return  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)

}