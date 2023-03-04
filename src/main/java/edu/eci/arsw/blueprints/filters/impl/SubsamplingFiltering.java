package edu.eci.arsw.blueprints.filters.impl;

import edu.eci.arsw.blueprints.filters.BlueprintFilter;
import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

//@Service
public class SubsamplingFiltering implements BlueprintFilter {
    @Override
    public void filter(Blueprint bp) {
        List<Point> points = new ArrayList<>();
        int i = 0;
        try {
            for (Point po : bp.getPoints()) {
                if (i % 2 != 0) points.add(po);
                i++;
            }
            bp.getPoints().removeAll(points);
        } catch (NullPointerException ignored) {

        }
    }
}
