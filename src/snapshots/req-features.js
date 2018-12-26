export default {
  name: "Requested Features",
  inputs: [
    {
      name: "Site pageviews",
      value: "0.1",
      description:
        "the sum of pageviews from the sites which will use this feature (x pageviews, in millions)."
    },
    {
      name: "Extra group sites",
      value: "0",
      description:
        "the total number of sites from the media group to which the site belongs (excluding the current site).",
      formula: "({ total }) => total"
    },
    {
      name: "Extra group pageviews",
      value: "0",
      description:
        "the total sum of pageviews from all the sites of the group (excluding the current site).",
      formula:
        "({ total, value, inputs }) => total + value/(Math.log10(inputs['Extra group sites']) + 1) * 0.5"
    },
    {
      name: "Development size",
      value: "1",
      description:
        "the size of the whole development of the feature estimated by the Tech team in Waffle.",
      formula: "({ total, value }) => total/(Math.log10(value) + 1)"
    }
  ],
  selects: [
    {
      name: "Blocking",
      selected: "no frontity without it",
      items: [
        {
          name: "no frontity without it",
          value: 10,
          description:
            "the site owner won't use Frontity if the feature is not present."
        },
        {
          name: "expected",
          value: 3,
          description:
            "the feature is expected, but site owner can use Frontity without it. Includes features with workaround accepted."
        },
        {
          name: "nice to have",
          value: 1,
          description:
            "the site owner can live without the feature, although he/she would like to have it eventually."
        }
      ]
    },
    {
      name: "Environment",
      selected: "production",
      items: [
        {
          name: "production",
          value: 3,
          description: "the feature is needed for a production site."
        },
        {
          name: "integration is starting",
          value: 6,
          description:
            "the feature is needed during the initial phases of an integration."
        },
        {
          name: "integration is finishing",
          value: 10,
          description:
            "the feature is needed during the last phases of the integration."
        },
        {
          name: "demo",
          value: 1,
          description: "the feature is needed for a demo site."
        }
      ]
    },
    {
      name: "Reusability potential",
      selected: "ad-hoc",
      items: [
        {
          name: "ad-hoc",
          value: 1,
          description: "the feature is only useful for this site."
        },
        {
          name: "marginal",
          value: 2,
          description:
            "the feature may be useful for other blogs, but it's not likely."
        },
        {
          name: "broad",
          value: 6,
          description:
            "the feature could be useful for many blogs. Includes integrations of WP plugins, Ad servers..."
        },
        {
          name: "everyone",
          value: 10,
          description:
            "the feature will improve the apps of every Frontity site."
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
