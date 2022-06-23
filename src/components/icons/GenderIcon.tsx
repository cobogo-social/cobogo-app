interface GenderIconProps {
  size: number;
}

function GenderIcon(props: GenderIconProps): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={props.size}
      fill="none"
      viewBox="0 0 45 45"
    >
      <path fill="url(#pattern0)" d="M0 0H45V45H0z" />
      <defs>
        <pattern
          id="pattern0"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use transform="scale(.01042)" xlinkHref="#image0_2956_706" />
        </pattern>
        <image
          id="image0_2956_706"
          width="96"
          height="96"
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAEeklEQVR4nO2cPYhdRRiG39lsI8ZdTSzMEhsVk9qN2YBdQDQiBjsrCwlaiWXQzsI/RFIYjdb+FIsgLiEiQbRR0MJacEHi7iaG+JeoBCHrYzFHWJbkzpyfOd+5934P3ObOOfPOfO+c+T33So7jOI7jOI7jTBvBugClASiZfwihVQxnuiqI0ww3wBg3wBg3wBg3wBg3wBg3wJiJNyBkIOmApN+tyzqVAIvAbzTEuvxjTdvguwEt6CL4XRgw8WPA9QAWJZ2VdJt1WabOAGBJ0ufKC/7lwsWZLmp2O38AS6W7oKmhSfCr+4oaMNu+at0DzEg6KOmwpEVJ+yQtSNop6ZqkX6vP95K+lvSVpO9CCNcNSBXMzyTNZ8hflvRQCOGbltUYP4C9wCvAemZL3coq8AKwsC3PpapF12r5W+4v+gQMAmA3cAr4p0Hgt3OVaOIcLYNflW0kFvHqFOAJ4Jem0R7Bz7QMflW+kfQdr84AZomt3pobBr8q50jaxsFkEAZukrQs6VEL/S2YD7i9L8SAHZI+kAdfks1K+KSkxw10tzKI4PcOccCtwxpwEngY2A/cXH32A0eqtLWaeY7s8ycWYBdwKTNIG8DTQHKMAmaAJ6t7crgI5CzIJgvyZzwrwC0N8p8DTmdqvFyijoOFuMLNWWS9SdyGaKozA7yVoXMV2NNlHQcNcWWaYqVN8Ldo7SDvSXi+i7oNniogqb2dDRp0OyM054HzCc1VYOJfThZwKKM1Hiug+0yG7n1d6w4O4g7lKNaIi7OudWdJP3nPdq1blz4WYgcS6R+HEDa7Fg0hXJP0SeKyB7rWrUsfBtybSP+0oPaZRPq+gtpZ9GFAarq3WlA7lffugtpZ9GHAzkT6hYLaG4n02wtqZ9GHAampXsmpYKp+nQ/+denDgL8T6QuJ9Dak8v6roHYWfRiQ6gbuLqh9TyI9Vbbi9GHAD4n0Rwpqp/JOla04fRjwbSL9KBnbznWp8jyauCxVtuL0YcCXifS9kp4qoHtM6THgiwK6w4K4RZw6LDkPzHWoOQ9cSGiuM4DNuOJPQAjhX0nvJi7bI2m5iz0h4pb2+5LuSFz6zo1eZZw4iMeRfyZaJMTDlMYmELe+387QuQKY/zagV4A3MgID8TCldndE7HbOZGq8XqKOgwa4FfgpM0CXgOfIO5SfJR7gpw5g/mcd2NVHnXPodRACHlR8TTxXd0PSiqTTkn6UtFZ9f6ekuxRf7npM+atpFN8HOptb5okDOJHZUktwwrr+5hAHyvcMgr9MgQXfWFKZ8GGPwf/Ig78N4uD5GrBZMPCbwKse/BEAh8l/rbAOF4Ej1vUbC4g/UXqJuEBqy5UqL/PjxrGDuGJ+ETjXIPDnqnsHM8cfW4AAHASOZwT+OHA/A9hYa8LgCw2jf4fV9n87rZm6/4oYGm6AMW6AMW6AMW6AMW6AMW6AMeZz6NQ8vy1DXyf4E2CMG2CMG2CMG2CMG2CMG2CMG2DMoOfIkp8HOIVxA4xxA4xxA4xxA4xxA4xxAxzHcRzHcRzHcXrmP5pLzoK4odu6AAAAAElFTkSuQmCC"
        />
      </defs>
    </svg>
  );
}

export default GenderIcon;
