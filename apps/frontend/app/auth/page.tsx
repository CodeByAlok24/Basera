const roles = [
  { value: "student", label: "Student" },
  { value: "pg_owner", label: "PG owner" },
  { value: "mess_owner", label: "Mess owner" }
];

export default function AuthPage() {
  return (
    <main className="authPage">
      <section className="authShell">
        <div>
          <p className="eyebrow">Join Basera</p>
          <h1>Create your Basera account.</h1>
          <p>
            Connect directly with verified PG owners and mess operators across India with zero brokerage.
          </p>
        </div>

        <form className="formPanel">
          <label>
            Name
            <input name="name" placeholder="Tushar Kumar Das" />
          </label>
          <label>
            Email
            <input name="email" type="email" placeholder="you@example.com" />
          </label>
          <label>
            Password
            <input name="password" type="password" placeholder="Minimum 8 characters" />
          </label>
          <label>
            Role
            <select name="role" defaultValue="student">
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </select>
          </label>
          <button type="button" className="primaryAction">
            Create account
          </button>
        </form>
      </section>
    </main>
  );
}

