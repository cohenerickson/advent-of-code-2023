use regex::Regex;

fn main() {
    let file: &str = include_str!("../../input.txt");

    let lines: Vec<&str> = file.trim().split("\n").collect::<Vec<&str>>();

    let mut sum = 0;

    let red_regex = Regex::new("(?<count>\\d+) red").unwrap();
    let green_regex = Regex::new("(?<count>\\d+) green").unwrap();
    let blue_regex = Regex::new("(?<count>\\d+) blue").unwrap();

    for line in lines {
        let data = line.split(": ").collect::<Vec<&str>>();

        let rounds = data[1].split("; ").collect::<Vec<&str>>();

        let mut red: i32 = 0;
        let mut green: i32 = 0;
        let mut blue: i32 = 0;

        for round in rounds {
            match red_regex.captures(round) {
                Some(caps) => {
                    let result = caps["count"].parse::<i32>().unwrap();

                    if result > red {
                        red = result;
                    }
                }
                None => {}
            };

            match green_regex.captures(round) {
                Some(caps) => {
                    let result = caps["count"].parse::<i32>().unwrap();

                    if result > green {
                        green = result;
                    }
                }
                None => {}
            };

            match blue_regex.captures(round) {
                Some(caps) => {
                    let result = caps["count"].parse::<i32>().unwrap();

                    if result > blue {
                        blue = result;
                    }
                }
                None => {}
            };
        }

        sum += red * green * blue;
    }

    println!("Part 2: {}", sum);
}
