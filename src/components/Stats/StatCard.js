// Component that renders a single card containing the information of the stat
const StatCard = ({ stat }) => {
    return (
        <>
            <article className='statCard d-flex flex-column text-center py-4' style={{ color: '#D9D2B0' }}>
                <h3> {stat.name} </h3>
                <p>{stat.description}</p>
            </article >
        </>
    )
}

export default StatCard
