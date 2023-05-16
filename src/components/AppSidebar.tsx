function AppSidebar() {
  const links = [
    {
      icon: "fa-solid fa-chart-line",
      active: false,
    },
    {
      icon: "fa-solid fa-coins",
      active: true,
    },
    {
      icon: "fa-regular fa-bookmark",
      active: false,
    },
    {
      icon: "fa-regular fa-comments",
      active: false,
    },
    {
      icon: "fa-solid fa-gear",
      active: false,
    },
  ];

  return (
    <section className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          {links.map((link, index) => (
            <li key={index} className={link.active ? "active" : ""}>
              <a href="">
                <i className={link.icon}></i>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default AppSidebar;
