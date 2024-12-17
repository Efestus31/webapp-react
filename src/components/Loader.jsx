import 'ldrs/ripples'


export default function Loader() {

    return (

        <div style={{ minHeight: 'calc(100vh - 450px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <l-ripples
                size="45"
                speed="2"
                color="black"
            ></l-ripples>
        </div>


    )
}