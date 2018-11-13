import $ from 'jquery'
export default
{
	mounted()
    { 
       
        this.DataTable()

    },
    updated()
    {
        
        this.DataTable()
    },
    methods:
    {
        DataTable()
        {
           if(this.$refs.items)
           $(this.$refs.tabla).DataTable();
        }
    }
}