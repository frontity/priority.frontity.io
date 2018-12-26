export default {
  name: "Bugs",
  inputs: [
    {
      name: "Pageviews",
      value: "0.1",
      description:
        "the sum of pageviews affected by this problem (x pageviews, in millions)"
    }
  ],
  selects: [
    {
      name: "Environment",
      selected: "production",
      items: [
        {
          name: "production",
          value: 10,
          description: "the problem appears in a production site"
        },
        {
          name: "integration is starting",
          value: 3,
          description:
            "the problem appears during the initial phases of the integration"
        },
        {
          name: "integration is finishing",
          value: 6,
          description:
            "the problem appears during the last phases of the integration"
        },
        {
          name: "demo",
          value: 1,
          description: "the problem appears in a demo site"
        }
      ]
    },
    {
      name: "Range",
      selected: "high",
      items: [
        {
          name: "high",
          value: 5,
          description: "the problem appears in most of the site pages"
        },
        {
          name: "medium",
          value: 3,
          description: "the problem appears in half of the site pages"
        },
        {
          name: "low",
          value: 1,
          description:
            "the problem only appears in a small percentage of the site pages"
        }
      ]
    },
    {
      name: "Behaviour",
      selected: "critical",
      items: [
        {
          name: "no frontity without it",
          value: 10,
          description: "client is going to deactivate Frontity"
        },
        {
          name: "critical",
          value: 5,
          description: "the problem is totally blocking the usage of a site"
        },
        {
          name: "not-nice",
          value: 1,
          description:
            "users can live with the problem, but it's something not nice to have"
        }
      ]
    },
    {
      name: "Mass",
      selected: "everyone",
      items: [
        {
          name: "everyone",
          value: 5,
          description: "the problem affects most of the users"
        },
        {
          name: "marginal",
          value: 1,
          description:
            "the problem only affects a small percentage of the users"
        }
      ]
    }
  ],
  checkboxes: [
    {
      name: "Referrer",
      value: 3,
      description:
        "the site belongs to a customer/group considered to be a referrer"
    },
    {
      name: "Case Study",
      value: 5,
      description: "the site is considered to be a potential case study"
    }
  ]
};
