export default function Banner({ title, subtitle, leadtext }) {

  return (
    <>
      <div className="banner bg-primary text-white py-4 mb-5">
        <div className="container-lg">
          <h1>{title}</h1>
          <h3 className="text-muted">{subtitle}</h3>
          <p className="lead">
            {leadtext}
          </p>
        </div>
      </div>

    </>
  )
}